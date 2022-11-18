import { ApiProperty, } from '@nestjs/swagger';
export class SignupDto {
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    username: string;
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    password: string;
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    fullName: string;
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    sex: string;
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    email: string;
}


export class LoginDto {
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    username: string;
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    password: string;

}

