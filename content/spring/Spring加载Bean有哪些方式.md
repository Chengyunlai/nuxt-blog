---
date: 2023-06-03 23:57:00
url: 
aliases: 
tags:
  - Spring面试
title: Spring加载Bean有哪些方式
edited date: 2023-06-03 星期六
---

## XML定义`<bean>`标签

在Spring的配置文件中，使用`<bean>`标签去定义一个Bean，可以通过配置类加载这个配置或者读取这个配置类的方式，将配置文件中的`<bean>`标签在Spring中解析，完成Bean的装载。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="person" class="top.chengyunlai.bean.Person"></bean>
</beans>
```

## 配置类 + @Bean

定义一个配置类，配置类使用`@Configuration`注解。在配置类中定义一个返回具体类型的方法，在方法中通过`new`的方式`return`该类的对象，在方法上加上`@Bean`注解。

```java
@Configuration
public class ApplicationConfig {
    // 可以直接在 `@Bean` 注解上显式的声明 Bean 的 id ，只不过在注解驱动的范畴里，它不叫 id 而是叫 **name**
    @Bean("MyPerson")
    public Person person(){
        Person person = new Person();
        return person;
    }
}

```

## @Component

使用`@Component`注解将Java类标记为Bean，可以通过在配置类上加上`@ComponentScan(包名)`的方式将Bean加载到IOC容器中。

`@Component`还有其他衍生注解：`@Service`、`@Repository`、`@Controller`、`@RestController`。

配置类：

在`juejin.autowrite`包及其自包中所有带有`@Component`及其衍生注解的类都会被注册成Bean，放入IOC容器中。

```java
@Configuration
@ComponentScan("juejin.autowrite")
public class AutoWriteConfig {
}
```
