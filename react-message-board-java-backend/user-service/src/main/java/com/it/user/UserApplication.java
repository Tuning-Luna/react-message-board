package com.it.user;

import com.it.api.config.DefaultFeignConfig;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@EnableFeignClients(basePackages = "com.it.api.client", defaultConfiguration = DefaultFeignConfig.class)
@MapperScan("com.it.user.mapper")
@SpringBootApplication(scanBasePackages = {"com.it.user", "com.it.common.config"})
public class UserApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserApplication.class, args);
    }

}