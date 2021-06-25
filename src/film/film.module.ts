import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { paginate } from 'src/config/plugins/paginate.plugin';
import { auth } from 'src/middleware/auth.middleware';
import { FilmController } from './film.controller';
import { Film, FilmSchema } from './film.model';
import { FilmService } from './film.service';

import slugify from 'slugify';
//import * as slugify from 'slugify';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Film.name,
        useFactory: () => {
          const schema = FilmSchema;

          // eslint-disable-next-line @typescript-eslint/ban-types
          schema.pre<Film>('save', async function (next: Function) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const film = this;
            film.slug = slugify(film.name);
            next();
          });

          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('../config/plugins/toJSON.plugin'));
          schema.plugin(paginate);
          return schema;
        },
      },
    ]),
  ],
  controllers: [FilmController],
  providers: [FilmService],
})
//export class FilmModule {}
export class FilmModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(auth('manageFilms'))

      .exclude(
        { path: 'film', method: RequestMethod.GET },
        { path: 'film/:id', method: RequestMethod.GET },
      )
      .forRoutes(FilmController);
  }
}
