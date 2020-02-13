export class CcloudSessionExpiredException extends Error {
  constructor(args: any = null) {
    super(args);
    this.name = "CcloudSessionExpired";
    this.message = "Login session has expired";
  }
}
