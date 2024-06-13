package serverSide.Database.UserDocuments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/userdocuments")
@CrossOrigin
public class UserDocumentsController {

    @Autowired
    private UserDocumentsService userDocumentsService;

    @PostMapping("/ShareDocument")
    public ResponseEntity<String> shareDocument(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String documentId = body.get("documentId");
        AccessType accessType = AccessType.valueOf(body.get("accessType").toUpperCase());
        try {
            userDocumentsService.shareDocument(documentId, username, accessType);
            return new ResponseEntity<>("Shared Successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
