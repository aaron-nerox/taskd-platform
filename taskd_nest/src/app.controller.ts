import { Controller, Get } from '@nestjs/common';

/**
 * The backend's entry point
 */
@Controller()
export class AppController {

  /**
   * Platform's main entry point
   * @method GET
   * @return string
   */
  @Get()
  greet(): string {
    return "Welcome to taskd platform api";
  }
}
