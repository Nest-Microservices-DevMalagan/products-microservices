import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductService')
  
  onModuleInit() {
    this.$connect();
    this.logger.log('Database Connected');
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto
    })
  }

  async findAll(paginationDto: PaginationDto) {
    const {page, limit} = paginationDto;

    const totalPage = await this.product.count({where:{available:true}});
    const lastPage = Math.ceil(totalPage/limit);
    
    return {
      data: await this.product.findMany({
        skip:(page - 1) * limit,
        take: limit,
        where:{available:true}
      }),
      metadata:{
        total: totalPage,
        page: page,
        lastPage: lastPage
      }
    }
  }

  async findOne(id: number) {
    const product = await this.product.findFirst({
      where: {id, available:true},
    });

    if(!product) throw new RpcException({
      message: `Product with id #${id} not found`,
      status:HttpStatus.BAD_REQUEST
    });

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const {id:__, ...data} = updateProductDto;

    await this.findOne(id);
    return this.product.update({
      where:{id},
      data: data,
    })
  }

  async remove(id: number) {

    await this.findOne(id);

    //! Hard delete (No conveniente porque genera error de refencia con otros microservicios)
    // return this.product.delete({
    //   where:{id}
    // });

    const product = await this.product.update({
      where:{id},
      data:{
        available: false
      }
    });

    return product;
  }

  async validateProduct(ids: number[]){

    ids = Array.from(new Set(ids));
    const products = await this.product.findMany({
      where: {
        id:{
          in:ids
        }
      }
    });

    if (products.length != ids.length){
      throw new RpcException({
        message:'Some product were not found',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    return products;
  }
}
