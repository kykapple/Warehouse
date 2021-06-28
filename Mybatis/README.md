# Mybatis
자바 객체와 SQL문 사이의 자동 Mapping 기능을 지원하는 프레임워크
  - JDBC를 통해 데이터베이스를 접근하는 작업을 추상화해준다.
  - 프로그램 코드와 SQL문의 분리로 코드의 간결성 및 유지보수성을 향상시켜준다.
 
## Mybatis의 주요 컴포넌트와 역할
 - Mybatis 설정 파일: 데이터베이스의 접속 정보나 SQL Mapping 파일의 경로 등 설정 정보를 담고 있다.
 - SqlSessionFactory: Mybatis 설정 파일을 바탕으로 SqlSessionFactory를 생성한다.
 - SqlSessionFactory: SqlSession을 생성한다.
 - SqlSession: 핵심적인 역할을 하는 클래스로서 SQL실행이나 트랜잭션 관리를 실행한다. 또한 Thread-safe 하지 않으므로 thread마다 필요에 따라 생성한다.
 - SQL Mapping 파일: 실행하고자 하는 SQL문을 담고 있다. 

## Mybatis의 실행 과정
 - 1. SqlSessionFactoryBuilder클래스의 객체를 생성하고, build()메소드를 통해 Mybatis 설정 파일을 인자로 하여(로딩하여) 호출하면 SqlsessionFactory 객체가 생성된다.
 - 여기서 Mybatis 설정 파일은 어떤 DBMS와 connection을 맺을지, SQL Mapping 파일로는 어떤 것들이 있는지 알 수 있고, Mybatis는 Sql Mapping 파일에 등록된 각 SQL 명령어들을 Map 구조로 저장하여 관리한다. 각 SQL 명렁어는 고유한 아이디 값을 가지고 있으므로 아이디를 통해 SQL을 실행할 수 있다.
 - 2. 생성된 SqlSessionFactory 객체에서 openSession()을 호출하면 SQL 실행 API를 제공하는 SqlSession 객체가 생성된다. 
 - 3. SqlSession 객체는 Sql Mapper 파일에 등록된 쿼리들을 실행하기 위한 API를 제공한다. SqlSession 객체는 Thread-safe하지 않으므로 thread마다 필요에 따라 각각 생성한다.
 - 제공하는 API로는 다음과 같은 것들이 있다.
    ```
    - public Object selectOne(String query, Object param): 하나의 데이터 검색
    - public List selectList(String query, Object param): 여러 개의 데이터 검색
    - public int insert(String query, Object param): insert작업(몇 개 insert 했는지 리턴)
    - public int update(String query, Object param): update작업(몇 개 update 했는지 리턴) 
    - public int delete(String query, Object param): delete작업(몇 개 delete 했는지 리턴)
    ```
 - 4. 일반적으로 레포지토리 단에서 SqlSession 객체를 생성해서 위의 메서드들을 가지고 query부분에 SQL Mapping 파일에 있는 각 SQL문의 고유한 id를 써주고, param 부분에는 SQL문을 날리면서 참조할 객체를 전달해서 호출한다.
 - 5. SqlSession은 SQL Mapping 파일에서 실행할 SQL문을 실행해준다.
위의 설명이 아래 그림의 빨간 박스 부분이고, Mybatis는 그 이후의 JDBC를 통해 DB에 접근하는 작업도 추상화해준다!
![image](https://user-images.githubusercontent.com/76088639/123593322-55392800-d829-11eb-8435-23223f6f681a.png)

## JDBC를 통해 DB에 접근하는 과정
 - 1. 데이터베이스에 작업을 하기 위해서는 사용하려는 해당 데이터베이스를 구동하는 코드를 가지고 있는 데이터베이스의 드라이버를 로딩해야 된다. 
 - 2. 그런데 여기서 데이터베이스의 종류는 매우 많기 때문에 공통적으로 접근할 수 있는 인터페이스가 필요한데, 그것이 바로 JDBC 인터페이스이다. 이 JDBC 인터페이스를 통해 모든 데이터베이스를 공통적인 인터페이스를 통해 접근할 수 있게 되는 것이다(특정 데이터베이스를 연결하기 위한 코드들은 몰라도 됨). 
 - 3. 이제는 사용하려는 데이터베이스의 드라이버를 로드해야 한다. 예를 들어 H2데이터베이스의 드라이버를 로딩한다고 하면 Class.forName(“org.h2.Driver”)를 오라클 데이터베이스의 드라이버를 로딩한다고 하면 Class.forName(“oracle.jdbc.driver.OracleDriver”)를 실행해주면 된다.
 - 4. 이렇게 Class.forName()을 실행하면 인자로 넘겨진 특정 데이터베이스의 드라이버가 로딩되고, 자동으로 인스턴스(JDBC 인터페이스 구현체)가 생성되어 준비가 완료된다. 이제는 껍데기와 같은 JDBC 인터페이스의 메소드를 호출하면 실제 내가 로딩한 데이터베이스 드라이버의 코드가 호출되게 된다.
 - 5. 따라서 이제는 DriverManager.getConnection()을 통해서 해당 데이터베이스의 connection을 가져오고 statement로 쿼리를 날려서 데이터베이스에 작업을 할 수 있게 된다.
