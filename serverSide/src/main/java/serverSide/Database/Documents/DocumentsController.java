package serverSide.Database.Documents;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin
public class DocumentsController {

    @Autowired
    private DocumentsService documentsService;

    @PostMapping("/RenameDocument")
    public ResponseEntity<String> RenameDocument(@RequestBody Map<String, String> body) {
        System.out.println("RenameDocument");
        String documentTitle = body.get("documentTitle");
        System.out.println(documentTitle);
        String documentId = body.get("documentId");
        System.out.println(documentId);
        try {
            if (documentsService.updateDocument(documentId, documentTitle)) {
                return new ResponseEntity<>("Documents successfully updated", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Document not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
