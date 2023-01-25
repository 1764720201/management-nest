export class CreatePermissionDto {
  public readonly id: number;
  public readonly name: string;
  public readonly type: number;
  public readonly url?: string;
  public readonly parentId?: number;
  public readonly icon?: string;
  public readonly permission?: string;
}
