package gateway.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.rsa.crypto.KeyStoreKeyFactory;
import org.springframework.security.web.server.SecurityWebFilterChain;

import java.security.KeyPair;

@Configuration
@EnableConfigurationProperties(JwtProperties.class)
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    // ... existing code ...
    @Bean
    public KeyPair keyPair(JwtProperties properties) {
        try {
            // 获取秘钥工厂
            KeyStoreKeyFactory keyStoreKeyFactory =
                    new KeyStoreKeyFactory(
                            properties.getLocation(),
                            properties.getPassword().toCharArray());
            //读取钥匙对
            return keyStoreKeyFactory.getKeyPair(
                    properties.getAlias(),
                    properties.getPassword().toCharArray());
        } catch (Exception e) {
            throw new RuntimeException("Failed to load JWT key pair from keystore: " + properties.getLocation(), e);
        }
    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        http
                // 1. 禁用 CSRF 保护：解决 An expected CSRF token cannot be found
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                // 2. 禁用 HTTP Basic 认证（默认开启）
                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable)
                // 3. 禁用表单登录（默认开启）
                .formLogin(ServerHttpSecurity.FormLoginSpec::disable)
                // 4. 禁用 Session（Gateway 是无状态的）
                .authorizeExchange(exchanges -> exchanges.anyExchange().permitAll()); // 允许所有请求通过 Spring Security 默认过滤器链，认证逻辑完全交给 AuthGlobalFilter

        return http.build();
    }
}