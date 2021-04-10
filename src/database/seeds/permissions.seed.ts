// import { Factory, Seeder } from 'typeorm-seeding';
// import { Connection } from 'typeorm';
// import { Permission } from '../../permissions/entities/permission.entity';

// export default class CreatePermissions implements Seeder {
//   public async run(factory: Factory, connection: Connection): Promise<any> {
//     await connection
//       .createQueryBuilder()
//       .insert()
//       .into(Permission)
//       .values([
//         { name: 'Admin', description: 'Minden jogosultság', code: 'ADMIN' },
//         {
//           name: 'Jogosultságkezelés',
//           description: 'Jogosul új jogosultságok létrehozására és azok felhasználókhoz társítására',
//           code: 'PERMISSION',
//         },
//         { name: 'Törlés', description: 'Törlési jog', code: 'DELETE' },
//       ])
//       .execute();
//   }
// }
