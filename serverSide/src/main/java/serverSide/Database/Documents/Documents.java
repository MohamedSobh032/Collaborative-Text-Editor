package serverSide.Database.Documents;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Documents {

    @Id
    private ObjectId id;
    private String title;
    private String description;
    private String data;

    public Documents(String title, String description, String data) {
        this.title = title;
        this.description = description;
        this.data = data;
    }
}
