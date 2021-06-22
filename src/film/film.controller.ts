import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { pick } from 'src/utils/utils';
import { FilmService } from './film.service';
import { CreateFilmPayload } from './payload/createFilm.payload';
import { Request } from 'express';
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
    async findAll(@Req() req: Request) {
      
        const filter = pick(req.query, ['name', 'rating']);
        const options = pick(req.query, ['sortBy', 'limit', 'page']);
        const result = await this.filmService.queryFilms(filter, options);
        
        return result;
    
    
    
    }    

}
