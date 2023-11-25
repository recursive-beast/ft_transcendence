import { Catch } from '@nestjs/common';

@Catch()
export class CatchAllFilter {
  catch() {}
}
