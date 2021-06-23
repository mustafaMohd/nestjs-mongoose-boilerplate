import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { paginate } from 'src/config/plugins/paginate.plugin';
import { auth } from 'src/middleware/auth.middleware';
import { FilmController } from './film.controller';
import { Film, FilmSchema } from './film.model';
import { FilmService } from './film.service';

const slugify = require('slugify')
//import * as slugify from 'slugify';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Film.name,
        useFactory: () => {
          const schema = FilmSchema;

          schema.pre<Film>('save', async function (next: Function) {
            const film = this;
            film.slug=slugify(film.name)
            next();
          });
          
          
           schema.plugin(require('../config/plugins/toJSON.plugin'));
          schema.plugin(paginate);
          return schema;
        },
      },
    ]),
  ],
  controllers: [FilmController],
  providers: [FilmService]
})
export class FilmModule {}
// export class FilmModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(auth("manageFilms")).exclude(
//         { path: 'film', method: RequestMethod.GET },
//         { path: 'film/:id', method: RequestMethod.GET }
        
//       )
//       .forRoutes(FilmController);
//   }
// }