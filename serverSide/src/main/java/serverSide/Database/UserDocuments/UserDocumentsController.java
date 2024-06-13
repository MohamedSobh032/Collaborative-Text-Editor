package serverSide.Database.UserDocuments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/userdocuments")
@CrossOrigin
public class UserDocumentsController {

    @Autowired
    private UserDocumentsService userDocumentsService;

}
