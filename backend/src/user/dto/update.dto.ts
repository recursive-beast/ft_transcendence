import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';

export class UserUpdateDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z][a-zA-Z0-9_-]*$/, {
    message:
      'displayName must start with a letter and only contain letters, digits, underscores and hyphens',
  })
  @MinLength(4)
  @MaxLength(30)
  @NotContains('admin')
  @NotContains('root')
  displayName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z]+([',. -][a-zA-Z]+)*$/, {
    message:
      'fullName must contain only alphabetical characters separated by spaces and common punctuation',
  })
  @NotContains('admin')
  @NotContains('root')
  fullName?: string;
}
