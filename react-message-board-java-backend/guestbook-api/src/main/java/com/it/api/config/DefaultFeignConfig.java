package com.it.api.config;

import com.it.api.utils.UserContext;
import feign.Logger;
import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.context.annotation.Bean;

public class DefaultFeignConfig {
    @Bean
    public Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }
    @Bean
    public RequestInterceptor userInfoInterceptor() {
        return new RequestInterceptor(){
            @Override
            public void apply(RequestTemplate template) {
                Integer userInfo = UserContext.getUser();
                if (userInfo != null) {
                    template.header("userInfo", userInfo.toString());
                }
            }
        };
    }

}
