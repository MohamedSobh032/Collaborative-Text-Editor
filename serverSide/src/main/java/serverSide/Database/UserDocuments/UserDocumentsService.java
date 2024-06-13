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

    public void shareDocument(String documentId, String username, AccessType accessType) {
        ObjectId docId = new ObjectId(documentId);
        UserDocuments userDocuments = userDocumentsRepository.findByDocumentIdAndUsername(docId, username);
        if (userDocuments == null) {
            UserDocuments newItem = new UserDocuments(docId, username, accessType);
            userDocumentsRepository.save(newItem);
        } else {
            userDocuments.setAccessType(accessType);
            userDocumentsRepository.save(userDocuments);
        }
    }

    public void deleteDocument(ObjectId documentId) {
        userDocumentsRepository.deleteByDocumentId(documentId);
    }
}
