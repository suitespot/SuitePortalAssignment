import { Injectable } from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';
import * as uuid from 'uuid';

type CollectionName = 'suites';

@Injectable()
export class SuitePortalService {
  private db: lowdb.LowdbAsync<any>;

  constructor() {
    this.initDatabase('suites');
  }

  private async initDatabase(collectionName: CollectionName) {
    const adapter = new FileAsync('suites-db.json');
    this.db = await lowdb(adapter);
    const listSuites = await this.db.get(collectionName).value();
    if (!listSuites) {
      await this.db.set(collectionName, []).write();
    }
  }

  async findAll(collectionName: CollectionName): Promise<any> {
    const listSuites = await this.db.get(collectionName).value();
    return listSuites;
  }

  async find(condition: object, collectionName: CollectionName): Promise<any> {
    const suite = await this.db.get(collectionName).find(condition).value();
    return suite;
  }

  async update(
    key: string,
    value: string,
    collectionName: CollectionName,
    dataUpdate: any,
  ): Promise<any> {
    const listSuites = await this.db.get(collectionName).value();
    let updatedSuite;
    const updatedList = listSuites.map(suite => {
      if (suite[key] !== value) return suite;
      updatedSuite = Object.assign(suite, dataUpdate);
      return updatedSuite;
    });
    await this.db.set(collectionName, updatedList).write();
    return updatedSuite;
  }

  async add(record: any, collectionName: CollectionName): Promise<any> {
    const listSuites = await this.db.get(collectionName).value();
    record.id = uuid.v1();
    listSuites.push(record);
    await this.db.set(collectionName, listSuites).write();
    return record;
  }
}
