import { makeObservable, observable, action, runInAction } from 'mobx';

export interface listItem {
  title: string;
  tasks: string[];
}

class taskStore {
  list: listItem[] = [];
  userTitleInput = '';
  userTaskInput = [];
  editingIndex = null;
  selectedIndex = 0;

  constructor() {
    makeObservable(this, {
      list: observable,
      setList: action,
      userTitleInput: observable,
      setUserTitleInput: action,
      editingIndex: observable,
      setEditingIndex: action,
      selectedIndex: observable,
      setSelectedIndex: action,
    });
  }

  setList(newList: listItem[]) {
    this.list = newList;
  }

  setEditingIndex(newIndex: any) {
    this.editingIndex = newIndex;
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
