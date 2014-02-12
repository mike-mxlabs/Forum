       function Comment(owner, commentText)
        {
            var self = this;
            self.commentText = ko.observable(commentText);
            self.owner = ko.observable(owner);
            self.date = Date();
        }

        function CommentsModel()
        {
            var self = this;

            self.commentsList = ko.observableArray([]);

            $.get("forumAPI.html", function (data)
            {
                //var x = ko.mapping.fromJS(data);
                var x = JSON.parse(data);

                x.forEach(function (entry)
                {
                    self.commentsList.push(new Comment(entry.owner, entry.commentText));
                });

            });

            self.addItem = function ()
            {
                if ($('#name').val() == "" || $('#comment').val == "") return false;

                self.commentsList.push(new Comment($('#name').val(), $('#comment').val()));
                $('#name').val("");
                $('#comment').val("");
                //Todo : send comment via AJAX to db.
            }

            self.save = function (item)
            {
                var jsonData = ko.toJSON(self.commentsList);
                alert(jsonData);
            }

        }


        ko.applyBindings(new CommentsModel());
