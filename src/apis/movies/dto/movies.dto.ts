import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMoviesDto {
    @ApiProperty({
        type: Boolean,
        description: 'This is a required property',
    })
    adult: boolean;
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    originalLanguage: string;
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    title: string;
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    overview: string;
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    originalTitle: string;
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    releaseDate: Date;
}


export class UpdateMoviesDto {
    @ApiPropertyOptional({
        type: Boolean,
        description: 'This is an optional property',
    })
    adult: boolean;
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    originalLanguage: string;
    @ApiPropertyOptional({
        type: String,
        description: 'This is an optional property',
    })
    title: string;
    @ApiPropertyOptional({
        type: String,
        description: 'This is an optional property',
    })
    overview: string;
    @ApiPropertyOptional({
        type: String,
        description: 'This is an optional property',
    })
    originalTitle: string;
    @ApiPropertyOptional({
        type: String,
        description: 'This is an optional property',
    })
    releaseDate: Date;
}

