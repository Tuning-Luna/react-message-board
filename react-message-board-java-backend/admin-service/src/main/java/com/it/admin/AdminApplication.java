package com.it.admin;

import com.it.admin.config.AuthProperties;
import com.it.admin.config.JwtProperties;
import com.it.api.config.DefaultFeignConfig;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients(basePackages = "com.it.api.client", defaultConfiguration = DefaultFeignConfig.class)
@MapperScan("com.it.admin.mapper")
@SpringBootApplication(scanBasePackages = {"com.it.admin", "com.it.api.utils","com.it.common.config"})
@EnableConfigurationProperties({JwtProperties.class, AuthProperties.class})
public class AdminApplication {
    public static void main(String[] args) {
        SpringApplication.run(AdminApplication.class, args);
    }

}