package serverSide.Database.UserDocuments;

import org.bson.types.ObjectId;
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

    @PostMapping("/RemoveAccess")
    public ResponseEntity<String> removeAccess(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        ObjectId documentId = new ObjectId(body.get("documentId"));
        try {
            userDocumentsService.deleteDocumentByDocumentIdAndUsername(documentId, username);
            return new ResponseEntity<>("Removed Successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
