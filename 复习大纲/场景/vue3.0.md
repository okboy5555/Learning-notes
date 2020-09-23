v-model:
v-model 可以实现表单元素的数据双向绑定
v-bind:xxx.sync 或者简写为 :xxx.sync 可以实现父子组件的双向绑定

那么在 Vue3.x 中得到了统一：
:xxx.sync 将被 v-model:xxx 取代
如果你希望跟子组件直接双向绑定，则：
<text-document v-model="doc"></text-document>
或者多个属性之间一一绑定：
<text-document 
    v-model:title="doc.title"
    v-model:content="doc.content"
></text-document>

废弃vm.children
废弃vm.$listeners
废弃vm.$slots