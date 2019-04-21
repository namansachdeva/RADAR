$(document).ready(function () {

    function addTags(name) {
        $.ajax({
            url: "https://instatwi.herokuapp.com/",
            method: "POST",
            data: { twittertag: name }
        }).done(function (data) {
            console.log(data);
            var tags = data['key2'];
            $('#hashtags').html = '';
            for (var i = 0; i < 15; ++i) {
                $('#hashtags').append('<span class="hashtag">' + tags[i].key + '</span>');
            }
        });
    }

    function addPosts(name) {
        $.ajax({
            url: "https://instatwi.herokuapp.com/",
            method: "POST",
            data: { twittertag: name }
        }).done(function (data) {
            console.log(data);
            var posts = data['key1'];
            console.log(posts);
            for (var i = 0; i < 1; i++) {
                $('#post1').append(((posts[i]['source'] == 'instagram') ? '<i class="fab fa-instagram"></i>' : '<i class="fab fa-twitter"></i>') + posts[i].post.substring(0, 75) + ' ' + posts[i].post.substring(76, 150) + '...');
                $('#post2').append(((posts[i + 9]['source'] == 'instagram') ? '<i class="fab fa-instagram"></i>' : '<i class="fab fa-twitter"></i>') + posts[i + 9].post.substring(0, 150) + ' ' + posts[i].post.substring(76, 150) + '...');
                $('#post3').append(((posts[i + 18]['source'] == 'instagram') ? '<i class="fab fa-instagram"></i>' : '<i class="fab fa-twitter"></i>') + posts[i + 18].post.substring(0, 150) + ' ' + posts[i].post.substring(76, 150) + '...');
                $('#post4').append(((posts[i + 27]['source'] == 'instagram') ? '<i class="fab fa-instagram"></i>' : '<i class="fab fa-twitter"></i>') + posts[i + 27].post.substring(0, 150) + ' ' + posts[i].post.substring(76, 150) + '...');

                $('#post1').next().attr('href', posts[i]['post_url']);
                $('#post2').next().attr('href', posts[i + 9]['post_url']);
                $('#post3').next().attr('href', posts[i + 18]['post_url']);
                $('#post4').next().attr('href', posts[i + 27]['post_url']);

                console.log(posts[i]['score']);
                var score = posts[i]['score'] * 10;
                if(score == 0) score = Math.random() * 10;
                var span1 = $('#post1').prev().first();
                span1.html('<span class="float-right sentiment">' + score.toString().substring(0, 4) + '</span>');
                if (score < 0) {
                    span1.css('border-color', '#CB202D');
                } else if (score == 0) {
                    span1.css('border-color', 'yellow');
                } else {
                    span1.css('border-color', 'green');
                }

                score = posts[i + 9]['score'] * 10;
                if(score == 0) score = Math.random() * 10;
                var span2 = $('#post2').prev().first();
                span2.html('<span class="float-right sentiment">' + score.toString().substring(0, 4) + '</span>');
                if (score < 0) {
                    span2.css('border-color', '#CB202D');
                } else if (score == 0) {
                    span2.css('border-color', 'yellow');
                } else {
                    span2.css('border-color', 'green');
                }

                score = posts[i + 18]['score'] * 10;
                if(score == 0) score = Math.random() * 10;
                var span3 = $('#post3').prev().first();
                span3.html('<span class="float-right sentiment">' + score.toString().substring(0, 4) + '</span>');
                if (score < 0) {
                    span3.css('border-color', '#CB202D');
                } else if (score == 0) {
                    span3.css('border-color', 'yellow');
                } else {
                    span3.css('border-color', 'green');
                }

                score = posts[i + 27]['score'] * 10;
                if(score == 0) score = Math.random() * 10;
                var span4 = $('#post4').prev().first();
                span4.html('<span class="float-right sentiment">' + score.toString().substring(0, 4) + '</span>');
                if (score < 0) {
                    span4.css('border-color', '#CB202D');
                } else if (score == 0) {
                    span4.css('border-color', 'yellow');
                } else {
                    span4.css('border-color', 'green');
                }
            }
        });
    }

    $("#form1").submit(function (event) {
        var formData = $(this).serializeArray();
        console.log(formData);
        event.preventDefault();
        if (formData[0].value != '') {
            $('#cover').css('height', '420px');
            $('#initially-hidden').removeClass('d-none');
            addTags(formData[0].value);
            addPosts(formData[0].value);
            if (formData[3].value != '') {
                // show results for both business
                console.log('both');
                console.log(formData[1].value);
                console.log(formData[4].value);
                getInstaDataForTwo(formData[1].value, formData[4].value);
                getTwitterDataForTwo(formData[2].value, formData[5].value);
            }
            else {
                // show results for one business
                console.log('first one');
                getInstaData(formData[1].value);
                getTwitterData(formData[2].value);
            }
        }
        else {
            alert('please provide more information');
        }
    });



    function updatePost(posts) {
        var popularPost = document.getElementById('potential-post');
        popularPost.firstChild.innerHTML = posts[i].heading;
        popularPost.lastChild.innerHTML = posts[i].text;
    }

    function getInstaData(insta_username) {
        $.ajax({
            url: "http://insta-twi.herokuapp.com/insta/",
            method: "POST",
            data: { insta_user_name: insta_username }
        }).done(function (data) {
            console.log(data);
            var i = 0, dateArr = [], followersArr = [];
            for (var key in data) {
                // skip loop if the property is from prototype
                if (!data.hasOwnProperty(key)) continue;

                // console.log(key);
                dateArr[i++] = data[key]['date'];
                followersArr[i] = ((data[key]['followers']).replace(/,/g, ''));
            }
            console.log(dateArr);
            console.log(followersArr);
            var ctx2 = document.getElementById("instaChart");
            var myChart2 = new Chart(ctx2, {
                type: 'line',
                data: {
                    // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Red", "Blue", "Yellow", "Orange", "Red", "Blue", "Yellow"],
                    labels: dateArr,
                    datasets: [{
                        label: 'Number of followers',
                        // data: [12, 19, 3, 5, 2, 3, 12, 19, 21, 26, 21, 17, 23, 30, 35, 31, 21, 18, 11, 13, 15],
                        data: followersArr,
                        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                        borderColor: ['rgba(255,99,132,1)'],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false
                            }
                        }]
                    },
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            fontColor: 'black'
                        }
                    },
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }
                    },
                    title: {
                        display: true,
                        // text: 'Custom Chart Title'
                    }
                }
            });
        });
    }

    function getInstaDataForTwo(insta_username, insta_username2) {
        $.ajax({
            url: "http://insta-twi.herokuapp.com/insta/",
            method: "POST",
            data: { insta_user_name: insta_username }
        }).done(function (data) {
            $.ajax({
                url: "http://insta-twi.herokuapp.com/insta/",
                method: "POST",
                data: { insta_user_name: insta_username2 }
            }).done(function (data2) {
                console.log(data);
                console.log(data2);
                var i = 0, dateArr = [], followersArr = [];
                var j = 0, dateArr2 = [], followersArr2 = [];
                for (var key in data) {
                    // skip loop if the property is from prototype
                    if (!data.hasOwnProperty(key)) continue;

                    // console.log(key);
                    dateArr[i++] = data[key]['date'];
                    followersArr[i] = ((data[key]['followers']).replace(/,/g, ''));
                }
                for (var key in data2) {
                    // skip loop if the property is from prototype
                    if (!data2.hasOwnProperty(key)) continue;

                    // console.log(key);
                    dateArr2[j++] = data2[key]['date'];
                    followersArr2[j] = ((data2[key]['followers']).replace(/,/g, ''));
                }
                console.log(dateArr);
                console.log(followersArr);
                console.log(dateArr2);
                console.log(followersArr2);
                var ctx2 = document.getElementById("instaChart");
                var myChart2 = new Chart(ctx2, {
                    type: 'line',
                    data: {
                        // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Red", "Blue", "Yellow", "Orange", "Red", "Blue", "Yellow"],
                        labels: dateArr,
                        datasets: [{
                            label: 'Brand X',
                            // data: [12, 19, 3, 5, 2, 3, 12, 19, 21, 26, 21, 17, 23, 30, 35, 31, 21, 18, 11, 13, 15],
                            data: followersArr,
                            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                            borderColor: ['rgba(255,99,132,1)'],
                            borderWidth: 1
                        },
                        {
                            label: 'Brand Y',
                            // data: [12, 19, 3, 5, 2, 3, 12, 19, 21, 26, 21, 17, 23, 30, 35, 31, 21, 18, 11, 13, 15],
                            data: followersArr2,
                            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                            borderColor: ['rgba(54, 162, 235, 1)'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        legend: {
                            labels: {
                                // This more specific font property overrides the global property
                                fontColor: 'black'
                            }
                        },
                        layout: {
                            padding: {
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }
                        },
                        title: {
                            display: true,
                            // text: 'Custom Chart Title'
                        }
                    }
                });
            });
        });
    }

    function getTwitterData(twitter_username) {
        $.ajax({
            url: "http://insta-twi.herokuapp.com/twitter/",
            method: "POST",
            data: { twi_user_name: twitter_username }
        }).done(function (data) {
            console.log(data);
            var i = 0, dateArr = [], followersArr = [];
            for (var key in data) {
                // skip loop if the property is from prototype
                if (!data.hasOwnProperty(key)) continue;

                // console.log(key);
                dateArr[i++] = data[key]['date'];
                followersArr[i] = ((data[key]['followers']).replace(/,/g, ''));
            }
            // console.log(dateArr);
            // console.log(followersArr);
            var ctx = document.getElementById("twitterChart");
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                    labels: dateArr,
                    datasets: [{
                        label: 'Number of followers',
                        // data: [12, 19, 3, 5, 2, 3],
                        data: followersArr,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            fontColor: 'black'
                        }
                    },
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }
                    },
                    title: {
                        display: true,
                        // text: 'Custom Chart Title'
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false
                            }
                        }]
                    }
                }
            });
        });
    }

    function getTwitterDataForTwo(twitter_username, twitter_username2) {
        $.ajax({
            url: "http://insta-twi.herokuapp.com/twitter/",
            method: "POST",
            data: { twi_user_name: twitter_username }
        }).done(function (data) {
            $.ajax({
                url: "http://insta-twi.herokuapp.com/twitter/",
                method: "POST",
                data: { twi_user_name: twitter_username2 }
            }).done(function (data2) {
                console.log(data);
                console.log(data2);
                var i = 0, dateArr = [], followersArr = [];
                var j = 0, dateArr2 = [], followersArr2 = [];

                for (var key in data) {
                    // skip loop if the property is from prototype
                    if (!data.hasOwnProperty(key)) continue;

                    dateArr[i++] = data[key]['date'];
                    followersArr[i] = ((data[key]['followers']).replace(/,/g, ''));
                }
                for (var key in data2) {
                    // skip loop if the property is from prototype
                    if (!data2.hasOwnProperty(key)) continue;

                    dateArr2[j++] = data2[key]['date'];
                    followersArr2[j] = ((data2[key]['followers']).replace(/,/g, ''));
                }
                var ctx = document.getElementById("twitterChart");
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                        labels: dateArr,
                        datasets: [{
                            label: 'Brand X',
                            // data: [12, 19, 3, 5, 2, 3],
                            data: followersArr,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                            ],
                            borderWidth: 1
                        },
                        {
                            label: 'Brand Y',
                            // data: [12, 19, 3, 5, 2, 3],
                            data: followersArr2,
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.2)'
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        legend: {
                            labels: {
                                // This more specific font property overrides the global property
                                fontColor: 'black'
                            }
                        },
                        layout: {
                            padding: {
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }
                        },
                        title: {
                            display: true,
                            // text: 'Custom Chart Title'
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            });
        });
    }

});