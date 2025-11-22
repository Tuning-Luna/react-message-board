package gateway;

import gateway.config.AuthProperties;
import gateway.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

//// 【修复1】排除数据源自动配置
//@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
//// 【修复2】启用 JwtProperties 配置
//@EnableConfigurationProperties(JwtProperties.class)
// 【修复1】排除数据源自动配置
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
// 【修复2】同时启用 JwtProperties 和 AuthProperties 配置
@EnableConfigurationProperties({JwtProperties.class, AuthProperties.class})

public class GatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
}