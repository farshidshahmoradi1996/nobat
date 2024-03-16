import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';

export class ApiSuccessDto<TData> {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: TData;
}
export const ApiSuccessResponse = <TModel extends Type<any>>(
  model: TModel,
  isArray?: boolean,
) => {
  if (isArray)
    return applyDecorators(
      ApiExtraModels(ApiSuccessDto, model),
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(ApiSuccessDto) },
            {
              properties: {
                data: {
                  type: 'array',
                  items: { $ref: getSchemaPath(model) },
                },
              },
            },
          ],
        },
      }),
    );
  return applyDecorators(
    ApiExtraModels(ApiSuccessDto, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiSuccessDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};
