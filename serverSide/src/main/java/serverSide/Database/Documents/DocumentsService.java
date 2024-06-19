package serverSide.Database.Documents;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DocumentsService {
    @Autowired
    private DocumentsRepository documentsRepository;

    public void deleteDocument(ObjectId documentId) {
        documentsRepository.deleteById(documentId);
    }

    public ObjectId addDocument(String documentTitle, String documentDescription) {
        Documents documents = new Documents(documentTitle, documentDescription, "");
        documentsRepository.save(documents);
        return documents.getId();
    }

    public Documents getDocumentById(ObjectId documentId) {
        return documentsRepository.findById(documentId).orElse(null);
    }

    public Boolean updateDocument(String documentId, String documentTitle) {
        Documents documents = documentsRepository.findById(documentId);
        if (documents == null) {
            return false;
        }
        documents.setTitle(documentTitle);
        documentsRepository.save(documents);
        return true;
    }

    public Boolean updateData(String documentId, Object Data) {
        Documents documents = documentsRepository.findById(documentId);
         if (documents == null) {
             return false;
         }
         documents.setData(Data);
         documentsRepository.save(documents);
         return true;
    }
}
