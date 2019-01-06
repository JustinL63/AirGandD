var db = require("../models");

module.exports = function (app) {

  // GET REQUESTS=================================================================
  // MUSIC - NEXTUP
  app.get("/music/nextup", function (req, res) {
    // Query database to find all albums that the user marked for NextUp from list
    db.UserAlbum.findAll({
      where: {
        user_id: req.user.id,
        nextup: true
      },
      include: [db.Album]
    })
      .then(function (data1) {
        // Query database to find all albums marked nextup that user added
        db.AlbumAdded.findAll({
          where: {
            user_id: req.user.id,
            nextup: true
          }
        }).then(function (data2) {
          var hbsObject = {
            albums: data1,
            add: data2
          };
          res.render("music-nextup", hbsObject)
        })
      })
  });

  // MUSIC - LISTENED
  app.get("/music/completed", function (req, res) {
    // Query db for all albums that user has listened to from list
    db.UserAlbum.findAndCountAll({
      where: {
        user_id: req.user.id,
        completed: true,
      },
      order: ['item'],
      include: [db.Album]
    })
      .then(function (data1) {
        // Query db for all albums that user has listened to and added
        db.AlbumAdded.findAndCountAll({
          where: {
            user_id: req.user.id,
            completed: true,
          },
          order: ['album']
        })
          .then(function (data2) {
            // Query for NextUp sidebar, using list items, limit of 5
            db.UserAlbum.findAll({
              limit: 5,
              where: {
                user_id: req.user.id,
                nextup: true
              },
              include: [db.Album]
            }).then(function (data3) {
              // Store number of records in a variable
              var records = data3.length;

              // Check to see if records returned is 5 or more
              if (records >= 5) {
                // If 5 are returned, render page and send object
                var hbsObject = {
                  albums: data2,
                  dashboard: data3
                };
                res.render("music-completed", hbsObject)

              } else {
                // If less than 5, query db for items from user-added nextup, equaling up to 5
                db.AlbumAdded.findAll({
                  limit: (5 - records),
                  where: {
                    user_id: req.user.id,
                    nextup: true
                  }
                }).then(function (data4) {
                  var hbsObject = {
                    albums: data1.rows,
                    albumCount: data1.count,
                    add: data2.rows,
                    addCount: data2.count,
                    dashboard: data3,
                    dashAdd: data4
                  };
                  res.render("music-completed", hbsObject)
                });
              }
            })
          });
      });
  })

  // MUSIC - FULL DB
  app.get("/music/full", function (req, res) {
    // Query for full database
    db.Album.findAll({})
      .then(function (data1) {
        // Query for NextUp sidebar
        db.UserAlbum.findAll({
          limit: 5,
          where: {
            user_id: req.user.id,
            nextup: true
          },
          include: [db.Album]
        }).then(function (data2) {
          // Store number of records in a variable
          var records = data2.length;

          // Check to see if records returned is 5 or more
          if (records >= 5) {
            // If 5 are returned, render page and send object
            var hbsObject = {
              albums: data1,
              dashboard: data2
            };
            res.render("music-full", hbsObject)

          } else {
            // If less than 5, query db for items from user-added nextup, equaling up to 5
            db.AlbumAdded.findAll({
              limit: (5 - records),
              where: {
                user_id: req.user.id,
                nextup: true
              }
            }).then(function (data3) {
              var hbsObject = {
                albums: data1,
                dashboard: data2,
                dashAdd: data3
              };
              res.render("music-full", hbsObject)
            });
          }
        });
      });
    })

        
   

  // MOVIES - NEXTUP
  app.get("/movies/nextup", function (req, res) {
    // Query database to find all movies that the user marked for NextUp from list
    db.UserMovies.findAll({
      where: {
        user_id: req.user.id,
        nextup: true
      },
      include: [db.Movies]
    })
      .then(function (data1) {
        // Query db to find all movies marked NextUp that user added
        db.MovieAdded.findAll({
          where: {
            user_id: req.user.id,
            nextup: true
          }
        }).then(function (data2) {
          var hbsObject = {
            movies: data1,
            add: data2
          };
          res.render("movies-nextup", hbsObject)
        })
      });
  });

  // MOVIES - LISTENED
  app.get("/movies/completed", function (req, res) {
    // Query database for all movies that user has watched from list
    db.UserMovies.findAndCountAll({
      where: {
        user_id: req.user.id,
        completed: true
      },
      order: ['item'],
      include: [db.Movies]
    })
      .then(function (data1) {
        // Query db for all movies that user has watched from added
        db.MovieAdded.findAndCountAll({
          where: {
            user_id: req.user.id,
            completed: true,
          },
          order: ['title']
        }).then(function (data2) {
          // Query for NextUp sidebar
          db.UserMovies.findAll({
            limit: 5,
            where: {
              user_id: req.user.id,
              nextup: true
            },
            include: [db.Movies]
          }).then(function (data3) {
            // Store number of records in a variable
            var records = data3.length;

            // Check to see if records returned is 5 or more
            if (records >= 5) {
              // If 5 are returned, render page and send object
              var hbsObject = {
                movies: data2,
                dashboard: data3
              };
              res.render("movies-completed", hbsObject)

            } else {
              // If less than 5, query db for items from user-added nextup, equaling up to 5
              db.MovieAdded.findAll({
                limit: (5 - records),
                where: {
                  user_id: req.user.id,
                  nextup: true
                }
              }).then(function (data4) {
                var hbsObject = {
                  movies: data1.rows,
                  movieCount: data1.count,
                  add: data2.rows,
                  addCount: data2.count,
                  dashboard: data3,
                  dashAdd: data4
                };
                res.render("movies-completed", hbsObject)
              });
            }
          })
        });
    });
})

  // MOVIES - FULL DB
  app.get("/movies/full", function (req, res) {
    // Query for full database
    db.Movies.findAll({})
      .then(function (data1) {
        // Query for NextUp sidebar
        db.UserMovies.findAll({
          limit: 5,
          where: {
            user_id: req.user.id,
            nextup: true
          },
          include: [db.Movies]
        }).then(function (data2) {
          // Store number of records in a variable
          var records = data2.length;

          // Check to see if records returned is 5 or more
          if (records >= 5) {
            // If 5 are returned, render page and send object
            var hbsObject = {
              movies: data1,
              dashboard: data2
            };
            res.render("movies-full", hbsObject)

          } else {
            // If less than 5, query db for items from user-added nextup, equaling up to 5
            db.MovieAdded.findAll({
              limit: (5 - records),
              where: {
                user_id: req.user.id,
                nextup: true
              }
            }).then(function (data3) {
              var hbsObject = {
                movies: data1,
                dashboard: data2,
                dashAdd: data3
              };
              res.render("movies-full", hbsObject)
            });
          }
        });
      });
    })

  // BOOKS - NEXTUP
  app.get("/books/nextup", function (req, res) {
    // Query db to find all books that the user marked for NextUp from list
    db.UserBooks.findAll({
      where: {
        user_id: req.user.id,
        nextup: true
      },
      include: [db.Books]
    })
      .then(function (data1) {
        // Query db to find all books marked NextUp that user added
        db.BookAdded.findAll({
          where: {
            user_id: req.user.id,
            nextup: true
          }
        }).then(function (data2) {
          var hbsObject = {
            books: data1,
            add: data2
          };
          res.render("books-nextup", hbsObject)
        })
      });
  });

  // BOOKS - LISTENED
  app.get("/books/completed", function (req, res) {
    // Query database for all movies that user has listened to
    db.UserBooks.findAndCountAll({
      where: {
        user_id: req.user.id,
        completed: true
      },
      order: ['item'],
      include: [db.Books]
    })
      .then(function (data1) {
        // Query db for all movies that user has watched from added
        db.BookAdded.findAndCountAll({
          where: {
            user_id: req.user.id,
            completed: true,
          },
          order: ['title']
        })
          .then(function (data2) {
            // Query for NextUp sidebar
            db.UserBooks.findAll({
              limit: 5,
              where: {
                user_id: req.user.id,
                nextup: true
              },
              include: [db.Books]
            }).then(function (data3) {
              // Store number of records in a variable
              var records = data3.length;

              // Check to see if records returned is 5 or more
              if (records >= 5) {
                // If 5 are returned, render page and send object
                var hbsObject = {
                  books: data2,
                  dashboard: data3
                };
                res.render("books-completed", hbsObject)

              } else {
                // If less than 5, query db for items from user-added nextup, equaling up to 5
                db.BookAdded.findAll({
                  limit: (5 - records),
                  where: {
                    user_id: req.user.id,
                    nextup: true
                  }
                }).then(function (data4) {
                  var hbsObject = {
                    books: data1.rows,
                    bookCount: data1.count,
                    add: data2.rows,
                    addCount: data2.count,
                    dashboard: data3,
                    dashAdd: data4
                  };
                  res.render("books-completed", hbsObject)
                });
              }
            })
          });
      });
  })

  // BOOKS - FULL DB
  app.get("/books/full", function (req, res) {
    // Query for full database
    db.Books.findAll({})
      .then(function (data1) {
        // Query for NextUp sidebar
        db.UserBooks.findAll({
          limit: 5,
          where: {
            user_id: req.user.id,
            nextup: true
          },
          include: [db.Books]
        }).then(function (data2) {
          // Store number of records in a variable
          var records = data2.length;

          // Check to see if records returned is 5 or more
          if (records >= 5) {
            // If 5 are returned, render page and send object
            var hbsObject = {
              books: data1,
              dashboard: data2
            };
            res.render("books-full", hbsObject)

          } else {
            // If less than 5, query db for items from user-added nextup, equaling up to 5
            db.BookAdded.findAll({
              limit: (5 - records),
              where: {
                user_id: req.user.id,
                nextup: true
              }
            }).then(function (data3) {
              var hbsObject = {
                books: data1,
                dashboard: data2,
                dashAdd: data3
              };
              res.render("books-full", hbsObject)
            });
          }
        });
      });
    })
  // =================================================================================

  // POST REQUESTS==================================================================
  // MUSIC - User marks album for NextUp
  app.post("/music/nextup", function (req, res) {
    // Query the DB to see if the user id and item number exist
    db.UserAlbum.findOne({
      where: {
        user_id: req.user.id,
        item: req.body.item
      }
    }).then(function (data) {

      // If an entry already exists, update the current record
      if (data) {
        db.UserAlbum.update(
          req.body,
          {
            where: {
              item: req.body.item,
              user_id: req.body.user_id
            }
          }).then(function (dbCreate) {
            res.json(dbCreate);
          });

        // If data doesn't exist, create a new record
      } else {
        db.UserAlbum.create(req.body)
          .then(function (dbCreate) {
            res.json(dbCreate);
          });
      }
    })
  })

  // MUSIC - User marks album as Listened To/Completed
  app.post("/music/completed", function (req, res) {
    // Query the DB to see if the user id and item number exist
    db.UserAlbum.findOne({
      where: {
        user_id: req.user.id,
        item: req.body.item
      }
    }).then(function (data) {

      // If an entry already exists, update the current record
      if (data) {
        db.UserAlbum.update(
          req.body,
          {
            where: {
              item: req.body.item,
              user_id: req.body.user_id
            }
          }).then(function (dbCreate) {
            res.json(dbCreate);
          });

        // If data doesn't exist, create a new record
      } else {
        db.UserAlbum.create(req.body)
          .then(function (dbCreate) {
            res.json(dbCreate);
          });
      }
    })
  })

  // MUSIC - User removes album
  app.post("/music/remove", function (req, res) {
    // Query the DB to see if the user id and item number exist
    db.UserAlbum.findOne({
      where: {
        user_id: req.user.id,
        item: req.body.item
      }
    }).then(function (data) {

      // If an entry already exists, update the current record
      if (data) {
        db.UserAlbum.update(
          req.body,
          {
            where: {
              item: req.body.item,
              user_id: req.body.user_id
            }
          }).then(function (dbCreate) {
            res.json(dbCreate);
          });

        // If data doesn't exist, create a new record
      } else {
        db.UserAlbum.create(req.body)
          .then(function (dbCreate) {
            res.json(dbCreate);
          });
      }
    })
  })

  // MOVIES - User marks movie for NextUp
  app.post("/movies/nextup", function (req, res) {
    // Query the DB to see if the user id and item number exist
    db.UserMovies.findOne({
      where: {
        user_id: req.user.id,
        item: req.body.item
      }
    }).then(function (data) {

      // If an entry already exists, update the current record
      if (data) {
        db.UserMovies.update(
          req.body,
          {
            where: {
              item: req.body.item,
              user_id: req.body.user_id
            }
          }).then(function (dbCreate) {
            res.json(dbCreate);
          });

        // If data doesn't exist, create a new record
      } else {
        db.UserMovies.create(req.body)
          .then(function (dbCreate) {
            res.json(dbCreate);
          });
      }
    })
  })

  // MOVIES - User marks movie as Listened To/Completed
  app.post("/movies/completed", function (req, res) {
    // Query the DB to see if the user id and item number exist
    db.UserMovies.findOne({
      where: {
        user_id: req.user.id,
        item: req.body.item
      }
    }).then(function (data) {

      // If an entry already exists, update the current record
      if (data) {
        db.UserMovies.update(
          req.body,
          {
            where: {
              item: req.body.item,
              user_id: req.body.user_id
            }
          }).then(function (dbCreate) {
            res.json(dbCreate);
          });

        // If data doesn't exist, create a new record
      } else {
        db.UserMovies.create(req.body)
          .then(function (dbCreate) {
            res.json(dbCreate);
          });
      }
    })
  })

  // MOVIE - User removes movie
  app.post("/movies/remove", function (req, res) {
    // Query the DB to see if the user id and item number exist
    db.UserMovies.findOne({
      where: {
        user_id: req.user.id,
        item: req.body.item
      }
    }).then(function (data) {

      // If an entry already exists, update the current record
      if (data) {
        db.UserMovies.update(
          req.body,
          {
            where: {
              item: req.body.item,
              user_id: req.body.user_id
            }
          }).then(function (dbCreate) {
            res.json(dbCreate);
          });

        // If data doesn't exist, create a new record
      } else {
        db.UserMovies.create(req.body)
          .then(function (dbCreate) {
            res.json(dbCreate);
          });
      }
    })
  })

  // BOOKS - User marks books for NextUp
  app.post("/books/nextup", function (req, res) {
    // Query the DB to see if the user id and item number exist
    db.UserBooks.findOne({
      where: {
        user_id: req.user.id,
        item: req.body.item
      }
    }).then(function (data) {

      // If an entry already exists, update the current record
      if (data) {
        db.UserBooks.update(
          req.body,
          {
            where: {
              item: req.body.item,
              user_id: req.body.user_id
            }
          }).then(function (dbCreate) {
            res.json(dbCreate);
          });

        // If data doesn't exist, create a new record
      } else {
        db.UserBooks.create(req.body)
          .then(function (dbCreate) {
            res.json(dbCreate);
          });
      }
    })
  })

  // BOOKS - User marks books as Read/Completed
  app.post("/books/completed", function (req, res) {
    // Query the DB to see if the user id and item number exist
    db.UserBooks.findOne({
      where: {
        user_id: req.user.id,
        item: req.body.item
      }
    }).then(function (data) {

      // If an entry already exists, update the current record
      if (data) {
        db.UserBooks.update(
          req.body,
          {
            where: {
              item: req.body.item,
              user_id: req.body.user_id
            }
          }).then(function (dbCreate) {
            res.json(dbCreate);
          });

        // If data doesn't exist, create a new record
      } else {
        db.UserBooks.create(req.body)
          .then(function (dbCreate) {
            res.json(dbCreate);
          });
      }
    })
  })

  // BOOKS - User removes book
  app.post("/books/remove", function (req, res) {
    // Query the DB to see if the user id and item number exist
    db.UserBooks.findOne({
      where: {
        user_id: req.user.id,
        item: req.body.item
      }
    }).then(function (data) {

      // If an entry already exists, update the current record
      if (data) {
        db.UserBooks.update(
          req.body,
          {
            where: {
              item: req.body.item,
              user_id: req.body.user_id
            }
          }).then(function (dbCreate) {
            res.json(dbCreate);
          });

        // If data doesn't exist, create a new record
      } else {
        db.UserBooks.create(req.body)
          .then(function (dbCreate) {
            res.json(dbCreate);
          });
      }
    })
  })

  // =========================================================================
  // // INITIAL INTERACTION WITH DATABASE
  // // MUSIC - User marks album for NextUp
  // app.post("/music/nextup", function (req, res) {
  //   db.UserAlbum.create(req.body)
  //     .then(function (dbCreate) {
  //       res.json(dbCreate);
  //     });
  // });

  // // MUSIC - User marks album as Listened To/Completed
  // app.post("/music/completed", function (req, res) {
  //   db.UserAlbum.create(req.body)
  //     .then(function (dbCreate) {
  //       res.json(dbCreate);
  //     });
  // })

  // // MUSIC - User removes album
  // app.post("/music/remove", function (req, res) {
  //   db.UserAlbum.create(req.body)
  //     .then(function (dbCreate) {
  //       res.json(dbCreate);
  //     });
  // })

  // // MOVIES - User marks movie for NextUp
  // app.post("/movies/nextup", function (req, res) {
  //   db.UserMovies.create(req.body)
  //     .then(function (dbCreate) {
  //       res.json(dbCreate);
  //     });
  // });

  // // MOVIES - User marks movie as Listened To/Completed
  // app.post("/movies/completed", function (req, res) {
  //   db.UserMovies.create(req.body)
  //     .then(function (dbCreate) {
  //       res.json(dbCreate);
  //     });
  // })

  // // MOVIE - User removes movie
  // app.post("/movies/remove", function (req, res) {
  //   db.UserMovies.create(req.body)
  //     .then(function (dbCreate) {
  //       res.json(dbCreate);
  //     });
  // })

  // // BOOKS - User marks books for NextUp
  // app.post("/books/nextup", function (req, res) {
  //   db.UserBooks.create(req.body)
  //     .then(function (dbCreate) {
  //       res.json(dbCreate);
  //     });
  // });

  // // BOOKS - User marks books as Read/Completed
  // app.post("/books/completed", function (req, res) {
  //   db.UserBooks.create(req.body)
  //     .then(function (dbCreate) {
  //       res.json(dbCreate);
  //     });
  // })

  // // BOOKS - User removes book
  // app.post("/books/remove", function (req, res) {
  //   db.UserBooks.create(req.body)
  //     .then(function (dbCreate) {
  //       res.json(dbCreate);
  //     });
  // })

  // // =========================================================================


  // // PUT REQUESTS - updates to NextUp list====================================
  // // MUSIC - User marks NextUp album as Listened To/Completed
  // app.put("/music/completed", function (req, res) {
  //   db.UserAlbum.update(
  //     req.body,
  //     {
  //       where: {
  //         item: req.body.item,
  //         user_id: req.body.user_id
  //       }
  //     })
  //     .then(function (dbUpdate) {
  //       res.json(dbUpdate);
  //     });
  // })

  // // MUSIC - User marks NextUp album as Remove
  // app.put("/music/remove", function (req, res) {
  //   db.UserAlbum.update(
  //     req.body,
  //     {
  //       where: {
  //         item: req.body.item,
  //         user_id: req.body.user_id
  //       }
  //     })
  //     .then(function (dbUpdate) {
  //       res.json(dbUpdate);
  //     });
  // })

  // // MOVIE - User marks NextUp movie as Listened To/Completed
  // app.put("/movies/completed", function (req, res) {
  //   db.UserMovies.update(
  //     req.body,
  //     {
  //       where: {
  //         item: req.body.item,
  //         user_id: req.body.user_id
  //       }
  //     })
  //     .then(function (dbUpdate) {
  //       res.json(dbUpdate);
  //     });
  // })

  // // MOVIE - User marks NextUp movie as Listened To/Completed
  // app.put("/movies/remove", function (req, res) {
  //   db.UserMovies.update(
  //     req.body,
  //     {
  //       where: {
  //         item: req.body.item,
  //         user_id: req.body.user_id
  //       }
  //     })
  //     .then(function (dbUpdate) {
  //       res.json(dbUpdate);
  //     });
  // })

  // // BOOKS - User marks NextUp book as Read
  // app.put("/books/completed", function (req, res) {
  //   db.UserBooks.update(
  //     req.body,
  //     {
  //       where: {
  //         item: req.body.item,
  //         user_id: req.body.user_id
  //       }
  //     })
  //     .then(function (dbUpdate) {
  //       res.json(dbUpdate);
  //     });
  // })

  // // BOOKS - User marks NextUp books as Read
  // app.put("/books/remove", function (req, res) {
  //   db.UserBooks.update(
  //     req.body,
  //     {
  //       where: {
  //         item: req.body.item,
  //         user_id: req.body.user_id
  //       }
  //     })
  //     .then(function (dbUpdate) {
  //       res.json(dbUpdate);
  //     });
  // })

  // // TEST - User marks NextUp books as Read
  // app.post("/music/test", function (req, res) {
  //   // Query the DB to see if the user id and item number exist
  //   db.UserAlbum.findOne({
  //     where: {
  //       user_id: req.user.id,
  //       item: req.body.item
  //     }
  //   }).then(function(data) {
  //     console.log(data);
  //     if (data) {
  //       db.UserAlbum.update(
  //         req.body,
  //         {
  //           where: {
  //             item: req.body.item,
  //             user_id: req.body.user_id
  //         }
  //       }).then(function (dbCreate) {
  //           res.json(dbCreate);
  //         });          

  //     } else {
  //       db.UserAlbum.create(req.body)
  //           .then(function (dbCreate) {
  //             res.json(dbCreate);
  //           });
  //     }
  //   })

  // })

}
