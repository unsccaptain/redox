# Redox
Executable File Analysis System

## 简介
&emsp;&emsp;Redox是一款可执行文件静态分析工具。很多类似的工具基本很久不更新了，要么就是功能不够或者收费太高用不起，所以就动手做一款开源软件，争取能提供较为完备的软件静态分析能力。  
&emsp;&emsp;目前的预期是实现pe，elf，jar和apk等类型文件的分析，包括元数据分析和代码静态分析，元数据分析包括信息展示和文件重组，代码静态分析包括反汇编和反编译。当然完全实现可能需要较长的周期，所以目前边实现新feature边发布。  
&emsp;&emsp;Redox使用electron来实现UI，后端的分析功能则是通过c++实现并编译成node的addon。

## 支持进度
* PE
  * X86
