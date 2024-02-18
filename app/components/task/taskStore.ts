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

    this.loadFromLocalStorage();
  }

  setList(newList: listItem[]) {
    this.list = newList;
    this.saveToLocalStorage();
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

  saveToLocalStorage() {
    const dataToSave = {
      list: this.list,
      selectedIndex: this.selectedIndex,
    };
    localStorage.setItem('taskStore', JSON.stringify(dataToSave));
  }

  loadFromLocalStorage() {
    const savedData = localStorage.getItem('taskStore');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      runInAction(() => {
        this.list = parsedData.list;
        this.selectedIndex = parsedData.selectedIndex;
      });
    }
  }
}

export default new taskStore();
