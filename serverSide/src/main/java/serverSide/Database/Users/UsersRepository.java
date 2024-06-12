package serverSide.Database.Users;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends MongoRepository<Users, ObjectId> {
    boolean existsByUsername(String username);
    Users findByUsername(String username);
    void deleteByUsername(String username);
}
