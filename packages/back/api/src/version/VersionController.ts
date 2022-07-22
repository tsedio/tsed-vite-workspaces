import { Constant, Controller, Get } from "@tsed/common";
import { object, Returns, string } from "@tsed/schema";

@Controller("/version")
export class VersionController {
  @Constant("version")
  private version: string;

  @Constant("rootDir")
  private rootDir: string;

  @Get("/")
  @Returns(200)
    .ContentType("application/json")
    .Schema(
      object({
        version: string().required()
      }).label("VersionInfo")
    )
  async get() {
    return {
      version: this.version
    };
  }
}
