package serverSide.Database.Documents;

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
        String documentTitle = body.get("documentTitle");
        String documentId = body.get("documentId");
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

    @PostMapping("/SaveDocument")
    public ResponseEntity<String> SaveDocument(@RequestBody Map<String, Object> body) {
        String documentId = (String) body.get("documentId");
        Object Data = body.get("documentData");
        try {
            if (documentsService.updateData(documentId, Data)) {
                return new ResponseEntity<>("Documents successfully updated", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Document not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
