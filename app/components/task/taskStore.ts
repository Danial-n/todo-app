import { makeObservable, observable, action, runInAction } from 'mobx';

export interface listItem {
  title: string;
  tasks: string[];
}

class taskStore {
  list: listItem[] = [];
  userTitleInput = '';
  userTaskInput = [''];
  selectedIndex = 0;

  constructor() {
    makeObservable(this, {
      list: observable,
      setList: action,
      userTitleInput: observable,
      setUserTitleInput: action,
      selectedIndex: observable,
      setSelectedIndex: action,
    });
  }

  setList(newList: listItem[]) {
    this.list = newList;
  }

  setSelectedIndex(newSelIndex: any) {
    this.selectedIndex = newSelIndex;
  }

  setUserTitleInput(newTitle: string) {
    this.userTitleInput = newTitle;
  }

  setUserTaskInput(newTask: any) {
    this.userTaskInput = newTask;
  }
}

export default new taskStore();
