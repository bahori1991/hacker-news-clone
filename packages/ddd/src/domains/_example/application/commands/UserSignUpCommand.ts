export class UserSignUpCommand {
  public constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
    public readonly image?: string | null | undefined,
  ) {}
}
