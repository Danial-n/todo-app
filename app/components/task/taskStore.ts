import { makeObservable, observable, action, runInAction } from 'mobx';

export interface listItem {
  title: string;
  tasks: string[];
}

class taskStore {
  list: listItem[] = [];

  constructor() {
    makeObservable(this, {
      list: observable,
      setList: action,
    });
  }

  setList(newList: listItem[]) {
    this.list = newList;
  }
}

export default new taskStore();
