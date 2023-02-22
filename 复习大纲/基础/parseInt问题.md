['1', '2', '3'].map(parseInt)
[1, NaN, NaN]

执行顺序：
parseInt('1', 0) // 1
parseInt('2', 1) // NaN
parseInt('3', 2) // NaN

parseInt(string, radix) 将一个字符串 string 转换为 radix 进制的整数， radix 为介于2-36之间的数。最后都是以十进制形式返回。
所以parseInt('2', 1) // NaN
如果radix没有指定，那么参数会假定以10为基数解析
所以parseInt('1', 0) // 1
二进制初选了3，parseInt的第一个参数string要小于第二个参数radix,所以parseInt('3', 2)等于NaN

拓展：
parseInt('10', 9)输出的不是NaN，而是9
根据前面对进制的描述，9进制表示的实数就是0~8之间。第一个参数不管传入的是string还是number，他都会被挨个解析成字符串处理,所以在9进制中'1'和'0'属于0~8的实数

parseInt('125', 5)输出为7
如果第一个参数string的第一个值就大于等于第二个参数radix，那么直接返回NaN
如果第一个参数string的第一个值符合条件，其他值不符合条件，那么不符合条件的值到最后会被忽略，然后进行计算

参考文章：
https://juejin.cn/post/6844904089059344398