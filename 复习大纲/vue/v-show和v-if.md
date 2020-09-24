v-show
先说 v-show，由于v-show指令是通过控制元素的css属性(display)从而实现显示和隐藏的效果，这也就说无论v-show是true还是false,元素都会有初始渲染，且状态改变元素不会导致元素或组件的重新生成和销毁。

当v-show指令附属于普通元素时,v-show指令状态变化不会影响父组件的生命周期。
当v-show指令附属于组件时，v-show指令状态变化时，父组件和本身组件的生命周期都不会被影响。

v-if
v-if就跟v-show不太一样了，因为v-if状态改变时，是真实进行相关的dom操作的(插入和删除)。

当v-if指令附属于普通元素时，v-if指令状态变化会使得父组件的dom发生变化，父组件将会更新视图，所以会触发父组件的beforeUpdate和updated钩子函数。
当v-if指令令附属于组件时，v-if指令状态变化对父组件的影响和上一条一致，但是对于本身组件的生命周期的影响是不一样的。

v-if从false切换到true时，会触发beforeCreate，created，beforeMount，mounted钩子。
2.v-if从true切换到false时，会触发beforeDestroy和destroyed钩子函数。