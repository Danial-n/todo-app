'use client';

import { makeObservable, observable, action, runInAction } from 'mobx';

export interface TaskItem {
  description: string;
  condition?: boolean;
}

export interface listItem {
  title: string;
  tasks: Array<TaskItem>;
}

class taskStore {
  list: listItem[] = [];
  task: TaskItem[] = [];
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

  loadFromLocalStorage = () => {
    const savedData =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('taskStore')
        : JSON.stringify([{ title: '', tasks: [{ description: '' }] }]);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      runInAction(() => {
        this.list = parsedData.list;
        this.selectedIndex = parsedData.selectedIndex;
      });
    }
  };
}

export default new taskStore();
