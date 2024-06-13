package serverSide.Database.Documents;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DocumentsRepository extends MongoRepository<Documents, ObjectId> {

    void deleteById(ObjectId Id);
    Optional<Documents> findById(ObjectId Id);
    Documents findById(String Id);
}
