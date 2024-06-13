package serverSide.Database.UserDocuments;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDocumentsService {

    @Autowired
    private UserDocumentsRepository userDocumentsRepository;

    public List<UserDocuments> findAndDeleteOwnerDocumentsByUsername(String username) {
        List<UserDocuments> ownerDocuments
                = userDocumentsRepository.findByUsernameAndAccessType(username, AccessType.OWNER);
        userDocumentsRepository.deleteByUsername(username);
        for (UserDocuments userDocuments : ownerDocuments) {
            userDocumentsRepository.deleteByDocumentId(userDocuments.getDocumentId());
        }
        return ownerDocuments;
    }

    public void addDocumentWithOwner(ObjectId documentId, String username) {
        UserDocuments userDocuments = new UserDocuments(documentId, username, AccessType.OWNER);
        userDocumentsRepository.save(userDocuments);
    }

    public List<UserDocuments> getUserDocuments(String username) {
        return userDocumentsRepository.findByUsername(username);
    }
}
