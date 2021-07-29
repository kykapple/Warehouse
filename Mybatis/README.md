# Mybatis
자바 객체와 SQL문 사이의 자동 Mapping 기능을 지원하는 프레임워크
  - JDBC를 통해 데이터베이스를 접근하는 작업을 추상화해준다.
  - 프로그램 코드와 SQL문의 분리로 코드의 간결성 및 유지보수성을 향상시켜준다.
 
## Mybatis의 주요 컴포넌트와 역할
 - Mybatis 설정 파일
      - 데이터베이스의 접속 정보나 SQL Mapping 파일의 경로 등 설정 정보를 담고 있다.
 - SqlSessionFactory
      - Mybatis 설정 파일을 바탕으로 SqlSessionFactory를 생성한다.
 - SqlSessionFactory
      - SqlSession을 생성한다.
 - SqlSession
      - 핵심적인 역할을 하는 클래스로서 SQL실행이나 트랜잭션 관리를 실행한다. 또한 Thread-safe 하지 않으므로 thread마다 필요에 따라 생성한다.
 - SQL Mapping 파일
      - 실행하고자 하는 SQL문을 담고 있다. 

## Mybatis의 실행 과정
  - SqlSessionFactoryBuilder클래스의 객체를 생성하고, build()메소드를 통해 Mybatis 설정 파일을 인자로 하여(로딩하여) 호출하면 SqlsessionFactory 객체가 생성된다.
     - 여기서 Mybatis 설정 파일은 어떤 DBMS와 connection을 맺을지, SQL Mapping 파일로는 어떤 것들이 있는지 설정되어 있고, Mybatis는 SQL Mapping 파일에 등록된 각 SQL 명령어들을 Map 구조로 저장하여 관리한다. 그리고 각 SQL 명령어는 고유한 아이디 값을 가지고 있으므로 아이디를 통해 SQL을 실행할 수 있다.
    
  - 생성된 SqlSessionFactory 객체에서 openSession()을 호출하면 SQL 실행 API를 제공하는 SqlSession 객체가 생성된다. 
  
  - SqlSession 객체는 Sql Mapper 파일에 등록된 쿼리들을 실행하기 위한 API를 제공한다. SqlSession 객체는 Thread-safe하지 않으므로 thread마다 필요에 따라 각각 생성한다.
    - 제공하는 API로는 다음과 같은 것들이 있다.
    ```java
    - public Object selectOne(String query, Object param): 하나의 데이터 검색
    - public List selectList(String query, Object param): 여러 개의 데이터 검색
    - public int insert(String query, Object param): insert작업(몇 개 insert 했는지 리턴)
    - public int update(String query, Object param): update작업(몇 개 update 했는지 리턴) 
    - public int delete(String query, Object param): delete작업(몇 개 delete 했는지 리턴)
    ```
  
  - 일반적으로 레포지토리 단에서 SqlSession 객체를 생성해서 위의 메서드들을 가지고 query부분에 SQL Mapping 파일에 있는 각 SQL문의 고유한 id를 써주고, param 부분에는 SQL문을 날리면서 참조할 객체를 전달해서 호출한다.
  
  - SqlSession은 SQL Mapping 파일에서 실행할 SQL문을 실행해준다.

![image](https://user-images.githubusercontent.com/76088639/123593322-55392800-d829-11eb-8435-23223f6f681a.png)

## JDBC를 통해 DB에 접근하는 과정
  - 데이터베이스에 작업을 하기 위해서는 사용하려는 해당 데이터베이스를 구동하는 코드를 가지고 있는 데이터베이스의 드라이버를 로딩해야 된다. 
  
  - 그런데 여기서 데이터베이스의 종류는 매우 많기 때문에 공통적으로 접근할 수 있는 인터페이스가 필요한데, 그것이 바로 JDBC 인터페이스이다. 이 JDBC 인터페이스를 통해 모든 데이터베이스를 공통적인 인터페이스를 통해 접근할 수 있게 되는 것이다(특정 데이터베이스를 연결하기 위한 코드들은 몰라도 됨). 
 
  - 이제는 사용하려는 데이터베이스의 드라이버를 로드해야 한다. 예를 들어 H2데이터베이스의 드라이버를 로딩한다고 하면 Class.forName(“org.h2.Driver”)를 오라클 데이터베이스의 드라이버를 로딩한다고 하면 Class.forName(“oracle.jdbc.driver.OracleDriver”)를 실행해주면 된다.
 
  - 이렇게 Class.forName()을 실행하면 인자로 넘겨진 특정 데이터베이스의 드라이버가 로딩되고, 자동으로 인스턴스(JDBC 인터페이스 구현체)가 생성되어 준비가 완료된다. 이제는 껍데기와 같은 JDBC 인터페이스의 메소드를 호출하면 실제 내가 로딩한 데이터베이스 드라이버의 코드가 호출되게 된다.
 
  - 따라서 이제는 DriverManager.getConnection()을 통해서 해당 데이터베이스의 connection을 가져오고 statement로 쿼리를 날려서 데이터베이스에 작업을 할 수 있게 된다.

## Mybatis-Spring
  - SqlSessionFactory와 SqlSession과 같은 Mybatis의 주요 컴포넌트들을 wrapping해서 좀 더 개발자가 편리하게 Mybatis와 연동해서 개발할 수 있도록 해준다. 
      - SqlSessionFactoryBean과 SqlSessionTemplate가 그와 같은 역할을 한다.
      - 여기서 SqlSessionFactoryBean은 SqlSessionFactory를 생성해주고, 이 SqlSessionFactory를 기반으로 해서 SqlSessionTemplate이 만들어지게 된다.
  - 수동 SqlSessionFactoryBean 참고
  ```java
  public class SqlSessionFactoryBean { 
      private static SqlSessionFactory sessionFactory = null; 
      
      static { 
          try { 
              if (sessionFactory == null) { 
                  Reader reader = Resources.getResourceAsReader("mybatis-config.xml"); 
                  sessionFactory = new SqlSessionFactoryBuilder().build(reader); 
              } 
          } catch (Exception e) { 
              e.printStackTrace(); 
          } 
      } 
      
      public static SqlSession getSqlSessionInstance() { 
          return sessionFactory.openSession(); 
      } 
  }
  ```

## Mybatis-Spring의 주요 컴포넌트와 역할
 - SqlSessionFactoryBean
      - Mybatis 설정 파일을 바탕으로 SqlSessionFactory를 생성한다.
      -  스프링 빈으로 등록해야 한다.
 - SqlSessionTemplate
      - 핵심적인 역할을 하는 클래스로서 SQL 실행이나 트랜잭션 관리를 실행한다. 
      - SqlSession 인터페이스를 구현하며, Thread-safe하다.
      - 스프링 빈으로 등록해야 한다.

## Mybatis-Spring의 실행 과정
  - 개발자가 해야될 일은 SqlSessionFactoryBean을 스프링 빈으로 등록해주는 것인데, 이렇게 스프링 빈으로 등록하면(datasource와 Mybatis 설정 파일을 생성자로 넘겨야 함.) SqlSessionFactoryBean이 내부적으로 SqlSessionFactory를 생성해준다.
  
  - 그 후, 생성된 SqlSessionFactory를 기반으로 SqlSessionTemplate을 생성해서 스프링 빈으로 등록을 해야 하는데, 이는 SqlSessionTemplate을 생성할 때 SqlSessionFactory를 생성자로 전달을 해주면 된다. 
  
  - SqlSessionFactoryBean과 SqlSessionTemplate 생성 참고
  ```
  	<!-- DataSource 설정 -->
	<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
		<property name="driverClassName" value="org.h2.Driver"></property>
		<property name="url" value="jdbc:h2:tcp://localhost/~/test"></property>
		<property name="username" value="sa"></property>
		<property name="password" value=""></property>
	</bean>
 
 	<!-- SqlsessionFactory 객체 생성을 위한 SqlSessionFactoryBean객체 생성 -->
	<bean id="sessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
		<property name="dataSource" ref="dataSource"></property>
		<property name="configLocation" value="classpath:sql-map-config.xml"></property>
	</bean>
	
	<!-- Mybatis(Sqlsession)와 Spring 연동 설정 -->
	<bean class="org.mybatis.spring.SqlSessionTemplate">
		<constructor-arg ref="sessionFactory"></constructor-arg>
	</bean>	
  ```
 
  - 개발자는 레포지토리 단에서 @Autowired를 통해 SqlSessionTemplate을 스프링 컨테이너로부터 주입 받은 후 SqlSession과 같은 메서드를 사용하면 된다.

### SqlSession과 SqlSessionTemplate의 차이
  - 그렇다면 SqlSession을 개발자들이 좀 더 편리하게 사용할 수 있도록 wrapping한 SqlSessionTemplate은 어떠한 차이점이 있을까?
      - SqlSessionTemplate은 Thread-safe하지 않은 SqlSession과는 다르게 Thread-safe하다. 
      - 즉, SqlSession은 Thread-safe하지 않기 때문에 매번 요청이 올 때마다 새로 객체를 생성해야하는 반면에 SqlSessionTemplate은 Thread-safe하기 때문에 멀티 쓰레드 환경에서 개발자가 편리하게 사용할 수 있다.

