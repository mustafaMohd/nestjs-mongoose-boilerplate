import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { pick } from 'src/utils/utils';
import { FilmService } from './film.service';

import { CreateFilmPayload } from './payload/createFilm.payload';
import { Request } from 'express';
import { UpdateFilmPayload } from './payload/updateFilm.payload';
import { Roles } from 'src/deocrators/roles.decorator';
import { Role } from 'src/emums/role.enum';
@Controller('film')
export class FilmController {


    constructor(private readonly filmService: FilmService) {}
    @Post('create')
    @UseGuards(AuthGuard("jwt"))
   
    async create(@Body() payload: CreateFilmPayload)  {
      
  
  
        const film = await this.filmService.createFilm(payload);
       
  
  return { film}
    }
    @Get()
    
    async queryFilms(@Req() req: Request) {
      
        const filter = pick(req.query, ['name', 'rating','genre']);
        const options = pick(req.query, ['sortBy', 'limit', 'page']);

        const result = await this.filmService.queryFilms(filter, options);
        
        return result;
    
    }
    @Get(':id')

    async getFilm(@Param('id') id: string){
   // return this.filmService.getFilmById(id);
    const film = await this.filmService.getFilmById(id);
    if (!film) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return film;
  }  
  @Delete(':id')
  @UseGuards(AuthGuard("jwt"))
  async deleteFilm(@Param('id') id: string){
    return this.filmService.deleteFilm(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard("jwt"))
  async update( @Param('id') id: string,@Body() updateFilmPayload: UpdateFilmPayload){
    return this.filmService.update(id, updateFilmPayload);
  }  

}
