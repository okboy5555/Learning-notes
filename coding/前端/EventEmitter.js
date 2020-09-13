class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(type, listener, isUnshift) {
    // 因为其他的类可能继承自EventEmitter，子类的events可能为空，保证子类必须存在此实例属性
    if(!this.events) {
      this.events = {};
    }
    if(this.events[type]) {
      if(isUnshift) {
        this.events[type].unshift(listener);
      } else {
        this.events[type].push(listener);
      }
    } else {
      this.events[type] = [listener]
    }

    if(type !== 'newListener') {
      // node的EventEmitter模块自带的特殊事件，该事件在添加新事件监听器的时候触发
      this.emit('newListener', type);
    }
  }
  emit(type, ...args) {
    if(this.events[type]) {
      this.events[type].forEach(fn => fn.call(this, ...args));
    }
  }
  // 只绑定一次，然后解绑
  once(type, listener) {
    const me = this;
    function oneTime(...args) {
      listener.call(this, ...args);
      me.off(type, oneTime);
    }
    me.on(type, oneTime)
  }
  off(type, listener) {
    if(this.events[type]) {
      const index = this.events[type].indexOf(listener);
      this.events[type].splice(index, 1);
    }
  }
}

// 运行示例
let event = new EventEmitter();

event.on('say',function(str) {
  console.log(str);
});

event.once('say', function(str) {
  console.log('这是once:' + str)
})

event.emit('say','visa');
event.emit('say','visa222');
event.emit('say','visa333');


