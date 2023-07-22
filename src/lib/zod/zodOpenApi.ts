import {
  OpenAPIRegistry,
  OpenAPIGenerator,
} from '@asteasolutions/zod-to-openapi';
import * as yaml from 'yaml';
import * as fs from 'fs';
import path from 'path';
import IComponentDoc from '@myTypes/generics/IComponentDoc';
import IComponentZod from '@myTypes/generics/IComponentZod';

import ZodComponentsPassword from '@validators/noAuthGeneric/zodComponents/ZodComponentsPassword';
import ZodComponentsSession from '@validators/session/zodComponents/ZodComponentsSession';
import ZodComponentsUserByUser from '@validators/user/zodComponents/ZodComponentsUserByUser';
import ZodComponentsUserNoAuth from '@validators/user/zodComponents/ZodComponentsUserNoAuth';
import ZodComponentsProductBySupplier from '@validators/product/zodComponents/ZodComponentsProductBySupplier';
import ZodComponentsProductByUser from '@validators/product/zodComponents/ZodComponentsProductByUser';
import ZodComponentsOrderBySupplier from '@validators/order/zodComponents/ZodComponentsOrderBySupplier';
import ZodComponentsOrderByUser from '@validators/order/zodComponents/ZodComponentsOrderByUser';

import { zod } from './ZodValidation';

class ZodOpenApiGenerate {
  private readonly API_INFO = {
    info: {
      version: '',
      title: '',
      description: '',
    },
  };

  public run() {
    this.generateFile(ZodComponentsPassword.document);
    this.generateFile(ZodComponentsSession.document);
    this.generateFile(ZodComponentsUserByUser.document);
    this.generateFile(ZodComponentsUserNoAuth.document);
    this.generateFile(ZodComponentsProductBySupplier.document);
    this.generateFile(ZodComponentsProductByUser.document);
    this.generateFile(ZodComponentsOrderBySupplier.document);
    this.generateFile(ZodComponentsOrderByUser.document);
  }

  private generateComponent(component: IComponentZod[]) {
    const registry: any = new OpenAPIRegistry();

    component.forEach((element: IComponentZod) => {
      if (element.type === 'body') {
        registry.register(element.name, zod.object(element.properties));
      } else {
        const keys: string[] = Object.keys(element.properties);
        keys.forEach((key: string) => {
          const teste = element.properties[key].openapi({
            param: { in: element.type, name: key },
          });
          registry.registerParameter(`${key}_${element.name}`, teste);
        });
      }
    });

    const generator = new OpenAPIGenerator(registry.definitions, '3.0.0');

    return generator.generateDocument(this.API_INFO);
  }

  private generateFile(zodDocument: IComponentDoc) {
    const docs: any = this.generateComponent(zodDocument.components);

    docs.info = undefined;
    docs.openapi = undefined;
    docs.paths = undefined;

    const fileContent = yaml.stringify(docs);
    const dir = path.resolve(
      __dirname,
      '../../..',
      'docs',
      'componentsRequest',
      `${zodDocument.fileName}.yml`
    );

    fs.writeFileSync(dir, fileContent, { encoding: 'utf-8' });
  }
}

const zodOpenApiGenerate = new ZodOpenApiGenerate();

zodOpenApiGenerate.run();
