package serverSide.Database;


import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import serverSide.Database.Documents.Documents;
import serverSide.Database.Documents.DocumentsController;
import serverSide.Database.Documents.DocumentsRepository;
import serverSide.Database.Documents.DocumentsService;
import serverSide.Database.UserDocuments.UserDocuments;
import serverSide.Database.UserDocuments.UserDocumentsService;
import serverSide.Database.Users.UsersService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/mixed")
@CrossOrigin
public class MixedController {

    @Autowired
    private UsersService usersService;
    @Autowired
    private DocumentsService documentsService;
    @Autowired
    private UserDocumentsService userDocumentsService;
    @Autowired
    private DocumentsController documentsController;
    @Autowired
    private DocumentsRepository documentsRepository;

    @PostMapping("/DeleteAccount")
    public ResponseEntity<String> DeleteAccount(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        try {
            /* Delete the user */
            usersService.DeleteUser(username);
            /* Delete all the entries with this user */
            List<UserDocuments> userDocuments = userDocumentsService.findAndDeleteOwnerDocumentsByUsername(username);
            if (!userDocuments.isEmpty()) {
                for (UserDocuments userDocument : userDocuments) {
                    ObjectId documentId = userDocument.getDocumentId();
                    documentsService.deleteDocument(documentId);
                }
            }
            return new ResponseEntity<>("User deleted", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/AddDocument")
    public ResponseEntity<String> AddDocument(@RequestBody Map<String, String> body) {
        String documentTitle = body.get("title");
        String documentDescription = body.get("description");
        String username = body.get("username");
        try {
            ObjectId id = documentsService.addDocument(documentTitle, documentDescription);
            userDocumentsService.addDocumentWithOwner(id, username);
            return new ResponseEntity<>("Document added", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{username}/GetDocuments")
    public ResponseEntity<List<Map<String, Object>>> getDocuments(@PathVariable String username) {
        try {
            List<UserDocuments> userDocuments = userDocumentsService.getUserDocuments(username);
            if (userDocuments.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                List<Map<String, Object>> documentsList = userDocuments.stream().map(userDocument -> {
                    Map<String, Object> documentMap = new HashMap<>();
                    ObjectId documentId = userDocument.getDocumentId();
                    Documents doc = documentsService.getDocumentById(documentId);
                    documentMap.put("id", doc.getId());
                    documentMap.put("title", doc.getTitle());
                    documentMap.put("description", doc.getDescription());
                    documentMap.put("accessType", userDocument.getAccessType());
                    return documentMap;
                }).collect(Collectors.toList());
                return ResponseEntity.ok(documentsList);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

}
