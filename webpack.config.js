import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";

export default {
   entry: './pack.js',
   output: {
      filename: 'google-custom-search.js',
      path: path.resolve('', 'public', 'my'),
      clean: true
   },
   watch: true,
   plugins: [
      new MiniCssExtractPlugin({
         filename: 'google-custom-search.css'
      })
   ],
   module: {
      rules: [
         {
            test: /\.s?css$/i,
            use: [
               // Creates `style` nodes from JS strings
               MiniCssExtractPlugin.loader,
               // Translates CSS into CommonJS
               "css-loader",
               {
                  loader: "postcss-loader",
                     options: {
                        postcssOptions: {
                           plugins: [
                              ["postcss-preset-env"],
                           ],
                        },
                     },
                  },
               // Compiles Sass to CSS
               "sass-loader",
            ],
         },
      ],
   },
   resolve: {
      extensions: ['.js', '.scss'],
   }
}