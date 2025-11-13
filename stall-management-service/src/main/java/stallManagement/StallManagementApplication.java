package stallManagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
@EnableCaching // Required to enable Redis caching
public class StallManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(StallManagementApplication.class, args);
    }
}